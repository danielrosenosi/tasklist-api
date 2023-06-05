import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { FiTrash } from 'react-icons/fi';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Checkbox, FormControl, FormGroup, FormControlLabel } from '@material-ui/core';

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
    task: any;
    getLists: any;
}

export function Task({ task, getLists }: Props) {
    const [token] = useState(localStorage.getItem("token"));

    async function handleChange(event: any) {
        event.preventDefault();

        try {
            const taskId = parseInt(event.target.value);

            api.put(`api/v1/task/close/${taskId}`, {} ,{
                headers: {
                  Authorization: `Bearer ${token}`,
                }
            })

            getLists();
        } catch {
            toast.error("Erro ao concluir tarefa!");
        }
    }

    async function handleDelete(task: number) {
        try {
            await api.delete(`api/v1/tasks/${task}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getLists();
        } catch {
            toast.error("Erro ao deletar tarefa!");
        }
    }

    return (
        <div key={task.id} className="d-flex justify-content-between align-items-center">
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value={task.id}
                        control={<GreenCheckbox checked={task.status === 0 ? false : true} onChange={handleChange} />}
                        label={task.title}
                        labelPlacement="end"
                    />
                </FormGroup>
            </FormControl>

            <FiTrash
                size={20}
                color="#a8a8b3"
                onClick={() => handleDelete(task.id)}
                cursor="pointer"
                title="Deletar tarefa"
            />
        </div>
    );
}