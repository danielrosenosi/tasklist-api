import { useEffect, useState } from "react";

import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

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
        <Card className="d-flex h-100">
            <Card.Title className="fs-5 px-3 mt-3 mb-0">Adicionar Tarefa</Card.Title>

            <Form onSubmit={handleInsertTask}>
                <Card.Body className="mt-2 mb-2">
                    <Form.Control
                        type="text"
                        placeholder="Nome da tarefa"
                        autoComplete="off"
                        required
                        value={taskName}
                        onChange={event => setTaskName(event.target.value)}
                    />

                    <Form.Select
                        id="task-list"
                        required
                        value={selectedList}
                        onChange={handleChangeSelect}
                    >
                        <option value="">Selecione uma lista</option>
                        {lists.map((list: any) => (
                            <option key={list.id} value={list.id}>{list.title}</option>
                        ))}
                    </Form.Select>
                </Card.Body>
                            
                <Card.Footer className="bg-white d-flex justify-content-end">
                    <Button variant="primary" type="submit" size="sm">
                        Adicionar
                    </Button>
                </Card.Footer>
            </Form>
        </Card>
    );
}