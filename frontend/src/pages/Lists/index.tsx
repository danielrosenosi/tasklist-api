import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
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
        await api.get("api/v1/taskList", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            } else {
                setTaskList(response.data.data);
            }
        });
    }

    async function onInsertList(data: any) {
        await api.post("api/v1/taskList", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            }

            //@ts-ignore
            setTaskList([...taskList, response.data.data]);

            toast.success("Lista cadastrada com sucesso!");
        }).catch(() => {
            toast.error("Erro ao cadastrar lista!");
        });
    }

    async function onInsertTask(data: any) {
        setListId("");

        await api.post("api/v1/tasks", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if(response.data.status && response.data.status === (401 || 498)) {
                localStorage.clear();
                navigate("/");
            }

            toast.success("Tarefa cadastrada com sucesso!");
        }).catch(() => {
            toast.error("Erro ao cadastrar tarefa!");
        })
    }

    useEffect(() => {
        getLists();
    }, []);
        
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
                                            <CardHeader title={list.title} />

                                            <CardContent>
                                                <Task list={list.id} listId={listId} />
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