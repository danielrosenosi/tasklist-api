import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { FiTrash } from 'react-icons/fi';
import { InsertList } from "../../app/components/InsertList";
import { InsertTask } from "../../app/components/InsertTask";

import api from "../../app/services/api"

import { Header } from "../../app/components/Header";
import { Task } from "../../app/components/Task";

export function Lists() {
    const [token] = useState(localStorage.getItem("token"));
    const [taskList, setTaskList] = useState([]);
    const [listId, setListId] = useState("");

    const navigate = useNavigate();

    async function getLists() {
        try {
            const response = await api.get("api/v1/taskList", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            }

            setTaskList(response.data);
        } catch {
            toast.error("Erro ao carregar listas!");
        }
    }

    async function onInsertList(data: any) {
        try {
            const response = await api.post("api/v1/taskList", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            }

            getLists();
            toast.success("Lista cadastrada com sucesso!");
            setListId(response.data.data.id);
        } catch {
            toast.error("Erro ao cadastrar lista!");
        }
    }

    async function onInsertTask(data: any) {
        setListId("");

        try {
            const response = await api.post("api/v1/tasks", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            }
            
            getLists();
            toast.success("Tarefa cadastrada com sucesso!");
        } catch {
            toast.error("Erro ao cadastrar tarefa!");
        }
    }

    async function handleDeleteTaskList(id: any) {
        try {
            await api.delete(`api/v1/taskList/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getLists();
            toast.success("Lista excluída com sucesso!");
        } catch {
            toast.error("Erro ao excluir lista!");
        }
    }

    useEffect(() => {
        getLists();
    }, []);

    console.log(taskList);

    return (
        <React.Fragment>
            <Header />
            <br />
            <Container maxWidth="xl">
                <Grid container>
                    <Grid item xs={5}>
                        <InsertList onInsertList={onInsertList} />
                        <br />
                        <InsertTask taskList={taskList} onInsertTask={onInsertTask}/>
                    </Grid>

                    <Grid item xs={7}>
                        <Container maxWidth="xl">
                            <Grid container spacing={3}>
                                {taskList.map((list: any) => (
                                    <Grid item xs={6} key={list.id}>
                                        <Card>
                                            <div className="d-flex justify-content-end me-2 mt-2">
                                                <FiTrash
                                                    size={20}
                                                    color="#a8a8b3"
                                                    onClick={() => handleDeleteTaskList(list.id)}
                                                    cursor="pointer"
                                                    title="Deletar a lista de tarefas"
                                                />
                                            </div>
                                            
                                            <CardHeader title={list.title} />

                                            <CardContent>
                                                {list.tasks.length > 0 && list.tasks.map((task: any) => (
                                                    <Task task={task} getLists={getLists}/>
                                                ))}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}