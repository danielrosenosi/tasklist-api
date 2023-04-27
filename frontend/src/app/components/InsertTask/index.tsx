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
        <Card className="h-100">
            <form onSubmit={handleInsertTask}>
                <Card.Header>
                    <h5 className="mb-0">Adicionar Tarefa</h5>
                </Card.Header>

                <Card.Body>
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
                        className="mt-3"
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
                
                <Card.Footer className="d-flex justify-content-end">
                    <Button type="submit" variant="success" size="sm">Adicionar</Button>
                </Card.Footer>
            </form>
        </Card>
    );
}