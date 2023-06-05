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
        <Card className="d-flex h-100">
            <Card.Title className="fs-5 px-3 mt-3 mb-0">Adicionar Lista</Card.Title>

            <Form onSubmit={handleSubmit}>
                <Card.Body className="mt-2">
                    <Form.Control
                        type="text"
                        placeholder="Nome da lista"
                        autoComplete="off"
                        required
                        value={listName}
                        onChange={event => setListName(event.target.value)}
                    />
                </Card.Body>

                <Card.Footer className="bg-white d-flex justify-content-end mt-5">
                    <Button variant="primary" type="submit" size="sm">
                        Adicionar
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
}