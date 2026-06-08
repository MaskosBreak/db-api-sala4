import s from './card.module.css'

export const Card = (props) => {
    return(
        <div className={s.card}>
            <img src={props.imagem} alt={props.nome} />
            <h4>Name: {props.nome}</h4>
            <p>Species: {props.especie}</p>
            <p>Gender: {props.genero}</p>
            <p>Ki: {props.ki}</p>
            <p>Max Ki: {props.maxKi}</p>
            <p>Affiliation: {props.afiliacao}</p>
        </div>
    )
}