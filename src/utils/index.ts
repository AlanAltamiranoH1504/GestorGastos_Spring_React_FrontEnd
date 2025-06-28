export const formatCurrency = (monto: number) => {
    return Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    }).format(monto);
}

export const formatDate = (fecha: string) => {
    return Intl.DateTimeFormat("es-MX", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(fecha));
}