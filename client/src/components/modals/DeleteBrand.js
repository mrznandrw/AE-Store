import React, {useContext, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {removeBrand} from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const DeleteBrand = observer(({show, onHide}) => {
    const [value, setValue] = useState('')
    const deleteBrand = () => {
        removeBrand(product.selectedBrand.id).then(data =>
            onHide()
        )
    }
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
                    Удалить бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 me-2">
                        <Dropdown.Toggle>{product.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={deleteBrand}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteBrand;