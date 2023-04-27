import { useState } from "react";

import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
        <Card className="mb-2 h-100">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Adicionar Lista</h5>
            </Card.Header>
            
            <form onSubmit={handleSubmit}>
                <Card.Body>
                    <Form.Control
                        type="text"
                        placeholder="Nome da lista"
                        autoComplete="off"
                        required
                        value={listName}
                        onChange={event => setListName(event.target.value)}
                    />
                    
                    <Button type="submit" variant="success" size="sm">Adicionar</Button>
                </Card.Body>
            </form>
        </Card>
    );
}