import { useState, useRef, useMemo } from "react";

function Label({ children }) {
    return (
        <label className="block text-sm font-medium text-gray-700">
            {children}
        </label>
    );
}

function Input({ type = "text", placeholder = "", inputRef }) {
    return (
        <input
            type={type}
            ref={inputRef}
            required
            className="mt-2 block w-full rounded-lg p-4 border border-white hover:border-purple-900 transition-all duration-300"
            placeholder={placeholder}
        />
    );
}

function TextArea({ placeholder = "", rows = 6, inputRef }) {
    return (
        <textarea
            ref={inputRef}
            required
            className="mt-2 block w-full rounded-lg p-5 border border-white hover:border-purple-900 transition-all duration-300"
            placeholder={placeholder}
            rows={rows}
        />
    );
}

export default function ContactForm() {
    const [loading, setLoading] = useState(false);

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
        };

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbw-fc_aKhsFZd2HppbgAfnHEanqwA2RWxzMWIL4e_XLL9qyWuUDtSy2AL7ujCciizww/exec",
                {
                    method: "POST",
                    mode: "no-cors", // 🔥 CLAVE
                    body: JSON.stringify(data),
                }
            );

            nameRef.current.value = "";
            emailRef.current.value = "";
            messageRef.current.value = "";

            alert("Mensaje enviado correctamente ✅");
        } catch (error) {
            console.error(error);
            alert("Error al enviar ❌");
        } finally {
            setLoading(false);
        }
    };

    const SubmitButton = useMemo(() => (
        <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-lg transition font-semibold text-white
                ${loading ? "bg-gray-400" : "bg-purple-950 hover:bg-purple-900"}`}
        >
            {loading ? "Enviando..." : "Enviar"}
        </button>
    ), [loading]);

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <Label>Nombre</Label>
            <Input placeholder="Nombre" inputRef={nameRef} />

            <Label>Email</Label>
            <Input placeholder="Correo" type="email" inputRef={emailRef} />

            <Label>Mensaje</Label>
            <TextArea placeholder="Escribe un mensaje" inputRef={messageRef} />

            {SubmitButton}
        </form>
    );
}
