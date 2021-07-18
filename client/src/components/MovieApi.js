import React from("react");

const MovieApi = (props) => {
    return(
        <>
            {props.films.map((film, index) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={film} alt='movie'></img>
                </div>
                ))}
        </>
    )
}