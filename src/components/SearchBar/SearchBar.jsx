import { useState } from "react"

export const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("")

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            onSearch(query)
        }
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Search posts by title or tag..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}