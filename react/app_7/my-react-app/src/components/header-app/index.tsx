
export function HeaderApp(props: { text: string, color?: string }) {
    const { text, color } = props
    return <h1 style={{ background: color }}> {text}</h1>
}