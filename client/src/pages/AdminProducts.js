import React, { useState, useEffect } from 'react'
import {fetchProducts, deleteProduct, fetchCategories, fetchBrands} from '../http/productAPI.js'
import {Button, Container, Spinner, Table, Pagination, Image} from 'react-bootstrap'
import CreateProduct from '../components/modals/CreateProduct.js'
import UpdateProduct from '../components/modals/UpdateProduct.js'
import {PRODUCT_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";

// количество товаров на страницу
const ADMIN_PER_PAGE = 6

const AdminProducts = () => {
    const [brands, setBrands] = useState([]) // список брендов
    const [categories, setCategories] = useState([]) // список категорий
    const [products, setProducts] = useState([]) // список загруженных товаров
    const [fetching, setFetching] = useState(true) // загрузка списка товаров с сервера
    const [createShow, setCreateShow] = useState(false) // модальное окно создания товара
    const [updateShow, setUpdateShow] = useState(false) // модальное окно редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
    const [product, setProduct] = useState(null)

    // текущая страница списка товаров
    const [currentPage, setCurrentPage] = useState(1)
    // сколько всего страниц списка товаров
    const [totalPages, setTotalPages] = useState(1)

    const navigate = useNavigate()
    // обработчик клика по номеру страницы
    const handlePageClick = (page) => {
        setCurrentPage(page)
        setFetching(true)
    }

    // содержимое компонента <Pagination>
    const pages = []
    for (let page = 1; page <= totalPages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                activeLabel=""
                onClick={() => handlePageClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    const handleUpdateClick = (id) => {
        setProduct(id)
        setUpdateShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteProduct(id)
            .then(
                data => {
                    // если это последняя страница и мы удаляем на ней единственный
                    // оставшийся товар — то надо перейти к предыдущей странице
                    if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
                        setCurrentPage(currentPage - 1)
                    } else {
                        setChange(!change)
                    }
                    alert(`Товар «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchCategories().then(data =>setCategories(data))
        fetchBrands().then(data => setBrands(data))
        fetchProducts(null, null, null, currentPage, ADMIN_PER_PAGE)
            .then(
                data => {
                    setProducts(data.rows)
                    setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE))
                }
            )
            .finally(
                () => setFetching(false)
            )
    }, [change, currentPage])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Товары</h1>
            <Button onClick={() => setCreateShow(true)} variant={"outline-success"}>Добавить товар</Button>
            <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
            <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
            {products.length > 0 ? (
                <>
                    <Table bordered hover size="sm" className="mt-3 text-center"  >
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>Изображение</th>
                            <th>Название</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Категория</th>
                            <th>Бренд</th>
                            <th>Редактировать</th>
                            <th>Удалить</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map(product =>
                            <tr key={product.id}>

                                <td>{product.id}</td>
                                <td style={{width: 100}} ><Image onClick={() => navigate(PRODUCT_ROUTE + '/' + product.id)} width={100} height={102} src={process.env.REACT_APP_API_URL + product.image}
                                            style={{cursor: 'pointer'}}
                                />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>


                                {(categories.filter(i => i.id == product.categoryId  )).map(i => <td>{i.name}</td>)}
                                {(brands.filter(i => i.id == product.brandId  )).map(i => <td>{i.name}</td>)}
                                <td>
                                    <Button className="mt-2" variant="outline-primary" size="sm" onClick={() => handleUpdateClick(product.id)} >
                                        Редактировать
                                    </Button>
                                </td>
                                <td>
                                    <Button className="mt-2" variant="outline-danger" size="sm" onClick={() => handleDeleteClick(product.id)}>
                                        Удалить
                                    </Button>
                                </td>


                            </tr>
                        )}
                        </tbody>
                    </Table>
                    {totalPages > 1 && <Pagination>{pages}</Pagination>}
                </>
            ) : (
                <p>Список товаров пустой</p>
            )}
        </Container>
    )
}

export default AdminProducts