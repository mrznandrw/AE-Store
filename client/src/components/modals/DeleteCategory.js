import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {removeBrand, removeCategory} from "../../http/productAPI";
import {observer} from "mobx-react-lite";

const DeleteCategory = observer(({show, onHide}) => {
    const {product} = useContext(Context)
    const deleteCategory = () => {
        removeCategory(product.selectedCategory.id).then(data =>
            onHide()
        )
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удалить категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{product.selectedCategory.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {product.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => product.setSelectedCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={deleteCategory}>Удалить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default DeleteCategory;