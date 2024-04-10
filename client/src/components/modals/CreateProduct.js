import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, DropdownButton, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createProduct, fetchBrands, fetchCategories, fetchProducts} from "../../http/productAPI";
import {observer} from "mobx-react-lite";
import {values} from "mobx";

const CreateProduct = observer((props) => {
    const { show, setShow, setChange } = props
    const {product} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [file, setFile] = useState(null)
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchCategories().then(data => product.setCategories(data))
        fetchBrands().then(data => product.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number:Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const addProduct = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('quantity', `${quantity}`)
        formData.append('description', description)
        formData.append('title', title)
        formData.append('image', file)
        formData.append('brandId', product.selectedBrand.id)
        formData.append('categoryId', product.selectedCategory.id)
        formData.append('info', JSON.stringify(info))
        createProduct(formData).then(data => {
            setShow(false)
            // изменяем состояние, чтобы обновить список товаров
            //setChange(state => !state)
        })
    }

    return (
        <Modal
            show={show} onHide={() => setShow(false)}
            //show={show}
            //onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить товар
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
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название товара"
                    />
                    <Form.Label className="mt-1">Введите стоимость товара </Form.Label>
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-1"
                        placeholder="Введите стоимость товара"
                        type="number"
                    />
                    <Form.Label className="mt-1">Введите количество товара </Form.Label>
                    <Form.Control
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="mt-1"
                        placeholder="Введите количество товара"
                        type="number"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание товара"
                    />
                    <Form.Control
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="mt-3"
                        placeholder="Введите заголовок товара"
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новую характеристику
                    </Button>
                    {info.map(i =>
                        <Row className="mt-3" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder="Введите название характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder="Введите описание характеристики"
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={() => setShow(false)}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;