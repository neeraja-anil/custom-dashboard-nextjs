
export default function Container({ children }: { children: JSX.Element }) {
    return (
        <div className="flex m-3">
            <div className="flex justify-center items-center bg-blue-100 rounded-lg p-2">
                {children}
            </div>
        </div>
    )
}