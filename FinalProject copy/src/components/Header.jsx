import {React} from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
    return(
        <div id='header'>
            <h1>Which Element Are You?</h1>
            <h2>(Based on completely random things)</h2>
            <div id='links'>
                <Link to="/">Home</Link>
                <Link to="/quiz">Quiz</Link>
            </div>

        </div>
    )
}