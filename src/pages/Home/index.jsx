import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api.js'

function Index() {
    const [schools, setSchools] = useState([])

    const inputName = useRef()
    const inputAddress = useRef()

    async function getSchools() {
        const schoolsFromApi = await api.get('/schools')

        setSchools(schoolsFromApi.data.schools)
    }

    async function createSchool() {
        await api.post('/schools', {
            name: inputName.current.value,
            address: inputAddress.current.value,
        })

        getSchools()

    }


    async function deleteSchool(id) {
        await api.delete(`schools/${id}`)

        getSchools()
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSchools()
    },[])

    return (
        <div className='container'>
            <form>
                <h1>Cadastro de Escolas</h1>
                <input placeholder={"Nome"} name={"name"} type={"text"} ref={inputName} />
                <input placeholder={"Endereço"} name={"address"} type={"text"} ref={inputAddress} />
                <button type={"button"} onClick={createSchool}>Cadastrar</button>
            </form>
            {schools.map((school) =>(
                <div key={school.id} className='userCard'>
                    <div>
                        <p>Nome: <span>{school.name}</span></p>
                        <p>Endereço: <span>{school.address}</span></p>


                    </div>

                    <button onClick={() => deleteSchool(school.id)}>
                        <img src={Trash} alt={"React"} />
                    </button>
                </div>
            ))}

        </div>
    )
}

export default Index
