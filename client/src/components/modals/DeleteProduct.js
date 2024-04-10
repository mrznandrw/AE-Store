import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Form, Modal} from "react-bootstrap";

const DeleteProduct = ({show, onHide}) => {
    const {product} = useContext(Context)
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Выберите товар </Form.Label>
                    <Form.Select className="mt-1 me-2">
                        {product.products.map(product => <option key={product.id}>{product.name} </option>
                        )}
                    </Form.Select>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={onHide}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteProduct;