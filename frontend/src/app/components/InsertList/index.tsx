import { useState } from "react";

import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField  } from '@material-ui/core';

type Props = {
    onInsertList: any;
}

export function InsertList({ onInsertList }: Props) {
    const [listName, setListName] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        await onInsertList({
            "title": listName,
            "status": 0
        });

        setListName("");
    };

    return (
        <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>
            <Card>
                <CardHeader title="Adicionar lista"/>

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="outlined-basic"
                                label="Nome da lista"
                                variant="outlined"
                                value={listName}
                                onChange={(event) => setListName(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    <Button size="small" type="submit">Cadastrar Lista</Button>
                </CardActions>
            </Card>
        </form>
    );
}