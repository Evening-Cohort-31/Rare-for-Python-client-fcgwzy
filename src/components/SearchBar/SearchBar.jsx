import { useState } from "react"

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(query)
        }
    }

    return (
        <div className="field mb-4">
            <div className="control">
            <input
                className="input is-fullwidth is-small"
                type="text"
                placeholder="Search posts by title or tag..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
            </div>
        </div>
    )
}