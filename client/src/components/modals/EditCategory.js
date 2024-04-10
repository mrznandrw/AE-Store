import {Modal, Button, Form, Dropdown} from 'react-bootstrap'
import {createCategory, fetchCategories, fetchCategory, updateCategory} from '../../http/productAPI.js'
import React, {useState, useEffect, useContext} from 'react'
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const EditCategory = observer((props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [valid, setValid] = useState(null)
    const [category, setCategory] = useState({})



    const {product} = useContext(Context)
product.categories.filter(category => category.categoryId===id)
    useEffect(() => {
        if(id) {
            fetchCategory(id)
                .then(
                    data => {
                        setCategory('')
                        setName(data.name)
                        setValid(data.name !== '')
                        product.categories.filter(category => (category.id === data.categoryId)  ).map(category =>  setCategory(category))
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setValid(null)
        }
       fetchCategories().then(data => product.setCategories(data))
    }, [id])

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        /*
         * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
         * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
         * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
         * «принял к сведению» наше сообщение, что состояние нужно изменить.
         */
        const correct = name.trim() !== ''
        setValid(correct)
        if (correct) {
            const data = {
                name: name.trim(),
                categoryId: category ? category.id : null
            }
            const success = (data) => {
                // закрываем модальное окно создания-редактирования категории
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список категорий
                setChange(state => !state)
            }
            const error = (error) => alert(error.response.data.message)
            id ? updateCategory(id, data).then(success).catch(error) : createCategory(data).then(success).catch(error)
            //setCategory('')
        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} категории</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{category.name || "Выберите родительскую категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => setCategory('')}
                            >
                                Отсутствует</Dropdown.Item>
                            {product.categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => setCategory(category)}
                                    key={category.id}
                                >
                                    {category.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        name="name"
                        value={name}
                        onChange={e => handleChange(e)}
                        isValid={valid === true}
                        isInvalid={valid === false}
                        placeholder="Название категории..."
                        className="mb-3"
                    />
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
})

export default EditCategory