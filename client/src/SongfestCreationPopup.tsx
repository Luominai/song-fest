function SongfestCreationPopup() {
    return (
        <>
            <form>
                <label htmlFor="theme">Theme:</label> <br></br>
                <input type="text" id="theme" required/> <br></br>

                <label htmlFor="songs per person">Songs per person:</label> <br></br>
                <input type="number" id="songs per person" required/> <br></br>

                <button>Submit</button>
            </form>
        </>
    )
}

export default SongfestCreationPopup