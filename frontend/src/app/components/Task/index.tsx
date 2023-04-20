import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';

import { FiTrash } from 'react-icons/fi';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Checkbox, FormControl, FormGroup, FormControlLabel, Grid  } from '@material-ui/core';

import api from "../../services/api";

const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props: any) => <Checkbox color="default" {...props} />);

type Props = {
    list: any;
    listId: any;
}

export function Task({ list, listId }: Props) {
    const [token] = useState(localStorage.getItem("token"));
    const [tasks, setTasks] = useState([]);

    async function getTasks(list_id: any = "") {
        try {
            const getList = list_id === "" ? list : listId;
            const response = await api.get(`api/v1/list/tasks/${getList}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setTasks(response.data.data);
        } catch {
            toast.error("Erro ao carregar tarefas!");
        }
    }

    async function handleChange(event: any) {
        event.preventDefault();

        try {
            const taskId = parseInt(event.target.value);

            const response = await api.put(`api/v1/task/close/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getTasks(response.data.data.list_id);
        } catch {
            toast.error("Erro ao concluir tarefa!");
        }
    }

    async function handleDelete(task: number) {
        await api.delete(`api/v1/tasks/${task}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            getTasks(response.data.data.list_id);
        }).catch(() => {
            toast.error("Erro ao deletar tarefa!");
        });
    }

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <React.Fragment>
            {tasks.map((task: any) => (
                <Grid container key={task.id}>
                    <Grid item xs={10}>
                        <FormControl component="fieldset">
                            <FormGroup aria-label="position" row>
                                <FormControlLabel
                                    value={task.id}
                                    control={<GreenCheckbox checked={task.status === "Pendente" ? false : true} onChange={handleChange} />}
                                    label={task.title}
                                    labelPlacement="end"
                                />
                            </FormGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={2}>
                        <FiTrash
                            size={20}
                            color="#a8a8b3"
                            onClick={() => handleDelete(task.id)}
                            cursor="pointer"
                            title="Deletar tarefa"
                        />
                    </Grid>
                </Grid>
            ))}
        </React.Fragment>
    );
}