import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Accordion, Card, Form, FormCheck, ListGroup} from "react-bootstrap";
import * as PropTypes from "prop-types";
let st

function Block(props) {
    return null;
}

Block.propTypes = {
    headerText: PropTypes.string,
    children: PropTypes.node
};
const FilterBar = observer(() => {
    const {product} = useContext(Context)
    const [checked, setChecked] = useState(false)
    const [brands, setBrands] = useState([])
    const [ price, setPrice ] = useState([ '', '' ]);
    const addBrand = (brand) => {brands.push(brand)

    }
    const removeBrand = (brand) => {
        setBrands(brands.filter(i => i !== brand))
    }
    console.log(st)
    const PriceInput = ({ index, ...props }) => (
        <input className="price-input" data-index={index} {...props} />
    );
    const onPriceChange = ({ target: { value, dataset: { index } } }) => {
        setPrice(price.map((n, i) => i === +index ? value : n));
    };
    const PriceFilter = ({ value, onChange }) => (
        <Form>
        <Block headerText="Price">
            <PriceInput value={value[0]} onChange={onChange} index="0" />
            &nbsp;-&nbsp;
            <PriceInput value={value[1]} onChange={onChange} index="1" />
            &nbsp;usd&nbsp;
        </Block>
            </Form>
    )

    return (
        <>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Бренд</Accordion.Header>
                <Accordion.Body>
                    <Form>
                        {product.brands.map(brand =>
                            <Form.Check
                                id-={brand.id}
                                onClick={() => product.setSelectedBrand(brand)}//onChange={checked ? 'yes' :"no" }
                                //onClick={() => checked ? ( setChecked(false),removeBrand(brand) ) : (setChecked(true), addBrand(brand),}
                               // onChange={() => setBrands()}
                                type="checkbox"
                                key={brand.id}
                                //id="custom-switch"
                                label={brand.name}
                            />

                        )}
                    </Form>
                </Accordion.Body>
            </Accordion.Item>


        </Accordion>
          </>
    );

});
console.log(st)
export default FilterBar;
