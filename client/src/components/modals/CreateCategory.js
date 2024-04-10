import React, {useContext, useEffect, useState} from 'react';
import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {Context} from "../../index";
import {createCategory, createProduct, fetchBrands, fetchCategories} from "../../http/productAPI";
import {observer} from "mobx-react-lite";


const CreateCategory = observer(({show, onHide}) => {
    const [value, setValue] = useState('')

    /*const addCategory = () => {
        createCategory({name:value}).then(data => {
            setValue('')
            onHide()
        })
    }*/
    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
    }, [])

    const addCategory = () => {
        const formData = new FormData()
        formData.append('name', value)
        formData.append('categoryId', product.selectedCategory.id)
        createCategory(formData).then(data => onHide())
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
                    Добавить категорию
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
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название категории"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;