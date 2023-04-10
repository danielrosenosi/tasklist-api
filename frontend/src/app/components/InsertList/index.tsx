import { Grid } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { CardHeader } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { TextField  } from '@material-ui/core';

export function InsertList() {
    return (
        <Card>
            <CardHeader title="Adicionar lista"/>

            <CardContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-basic"
                            label="Nome da lista"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button size="small">Cadastrar Lista</Button>
            </CardActions>
        </Card>
    );
}