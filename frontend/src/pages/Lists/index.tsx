import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { InsertList } from "../../app/components/InsertList";
import { InsertTask } from "../../app/components/InsertTask";

import api from "../../app/services/api"

export function Lists() {
    const token = useState(localStorage.getItem("token"));
    const [taskList, setTaskList] = useState([]);
    const [listId, setListId] = useState([]);

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
                console.log(response.data.data);
                setTaskList(response.data.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getLists();
    }, []);
        
    return (
        <React.Fragment>
            <br />
            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <InsertList />

                        <br />

                        <InsertTask />
                    </Grid>

                    <Grid item xs={8}>
                        <Container maxWidth="xl">
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Card>
                                        <CardContent>
                                            <h1>Item 1</h1>
                                            <p>Item 1</p>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small">Editar</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}