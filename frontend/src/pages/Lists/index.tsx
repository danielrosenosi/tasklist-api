import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FiTrash } from 'react-icons/fi';

import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

import { InsertList } from "../../app/components/InsertList";
import { InsertTask } from "../../app/components/InsertTask";
import { Header } from "../../app/components/Header";
import { Task } from "../../app/components/Task";

import api from "../../app/services/api"

export function Lists() {
    const [token] = useState(localStorage.getItem("token"));
    const [taskList, setTaskList] = useState([]);

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
        } catch {
            toast.error("Erro ao cadastrar lista!");
        }
    }

    async function onInsertTask(data: any) {
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

    return (
        <React.Fragment>
            <Header />

            <Container>
                <Row className="mb-4">
                    <Col lg={6} md={6}>
                        <InsertList onInsertList={onInsertList} />
                    </Col>

                    <Col lg={6} md={6}>
                        <InsertTask taskList={taskList} onInsertTask={onInsertTask}/>
                    </Col>
                </Row>
                
                <Row>   
                    {taskList.map((list: any) => (
                        <Col lg={6} md={6} className="mb-2" key={list.id}>
                            <Card>
                                <Card.Header>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">{list.title}</h5>

                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteTaskList(list.id)}
                                            title={`Excluir lista ${list.title}`}
                                        >
                                            <FiTrash />
                                        </Button>
                                    </div>
                                </Card.Header>

                                <Card.Body>
                                    {list.tasks.length > 0 ? list.tasks.map((task: any) => (
                                        <Task key={task.id} task={task} getLists={getLists}/>
                                    )) : (
                                        <div className="text-center">
                                            <small className="text-muted text-center">Nenhuma tarefa cadastrada</small>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </React.Fragment>
    );
}