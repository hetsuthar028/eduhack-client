import React, { useState } from "react";

export function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    return {
        values,
        setValues,
        handleInputChange,
    };
}

export function Form(props) {
    return <form>{props.children}</form>;
}
