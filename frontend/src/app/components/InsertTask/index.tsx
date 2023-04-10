import { useState } from "react";
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

export function InsertTask() {
    const [lists, setLists] = useState([]);
    const [selectList, setSelectList] = useState("");
    const [taskName, setTaskName] = useState("");
    
    return (
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
                        />
                    </Grid>
                </Grid>
                
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* <Select
                            native
                            fullWidth
                            label="Lista"
                        >
                            <option value="1">Lista 1</option>
                            <option value="2">Lista 2</option>
                            <option value="3">Lista 3</option>
                        </Select> */}
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="list">Lista</InputLabel>

                            <Select
                                labelId="list"
                                id="demo-simple-select-helper"
                                label="Age"
                            >
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CardContent>
            
            <CardActions>
                <Button size="small">Cadastrar Tarefa</Button>
            </CardActions>
        </Card>
    );
}