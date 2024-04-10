import React from 'react';
import {MAIN_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";

const NotFoundPage = () => {
    return (
        <div className="col-md-12 text-center p-5">
            <h1>404</h1>
            <h2>Страница не найдена</h2>
            <p>
                Извините, страница, которую вы ищете, не существует.
            </p>
            <Button variant="outline-primary" type="button" className="me-2" href={MAIN_ROUTE}>
                На главную
            </Button>
        </div>
    );
};

export default NotFoundPage;
