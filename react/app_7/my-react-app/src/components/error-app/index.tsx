import React from "react"
interface State {
    hasError: boolean,
    error: null
};
interface Props {
    children: any
}
export default class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }


    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: "1rem", color: "red" }}>
                    <h2>Something went wrong. Amitay is working to fix it</h2>
                </div>
            );
        }
        return this.props.children;
    }
}