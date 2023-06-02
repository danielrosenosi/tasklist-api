import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField  } from '@material-ui/core';
import { Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';

type Props = {
    onInsertTask: any;
    taskList: any;
}

export function InsertTask({ onInsertTask, taskList }: Props) {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState("");
    const [taskName, setTaskName] = useState("");

    function handleChangeSelect(event: any) {
        setSelectedList(event?.target.value);
    }

    async function handleInsertTask(event: any) {
        event.preventDefault();

        await onInsertTask({
            "list_id": selectedList,
            "title": taskName,
            "status": 0
        });

        setSelectedList("");
        setTaskName("");
    }

    useEffect(() => {
        if(taskList.length > 0) {
            setLists(taskList);
        }
    }, [taskList])
    
    return (
        <form noValidate autoComplete="off" onSubmit={handleInsertTask}>
            <Card>
                <CardHeader title="Adicionar Tarefa"/>

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="task-name"
                                label="Nome da tarefa"
                                variant="outlined"
                                fullWidth
                                value={taskName}
                                onChange={event => setTaskName(event.target.value)}
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="list">Lista</InputLabel>

                                <Select
                                    labelId="list"
                                    id="demo-simple-select-helper"
                                    label="Lista"
                                    value={selectedList}
                                    onChange={handleChangeSelect}
                                >
                                    {lists.map((list: any) => (
                                        <MenuItem key={list.id} value={list.id}>{list.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                
                <CardActions>
                    <Button size="small" type="submit">Cadastrar Tarefa</Button>
                </CardActions>
            </Card>
        </form>
    );
}