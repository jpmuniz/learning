import React, { useState, FormEvent, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight } from 'react-icons/fi'
import Logo from '../assets/img/logoDashBoard.svg'
import  api from '../services/api'

import { Title, Form, Repositories, Error } from './style'

interface Repository {
    full_name: string
    description: string
    owner:{
        login: string
        avatar_url: string
    }
}

const Dashboard: React.FC = () =>{
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')
    const [repositories, setRepositories]= useState<Repository[]>(()=>{
        const hasRepo = localStorage.getItem('insertRepositoriesToStorage')

        if(hasRepo){
            return JSON.parse(hasRepo)
        }else{
            return []
        }
    })

    useEffect(()=>{
        localStorage.setItem('insertRepositoriesToStorage',JSON.stringify(repositories))
    },[repositories])

    async function handleAddRepository(event:FormEvent){
        event.preventDefault()
        if(!newRepo){
            setInputError("Preencha o campo")
            return
        }
        try {
            const response = await api.get(`repos/${newRepo}`)
            const repository = response.data;
            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
        } catch (err) {
            setInputError(`Erro na busca por esse "${newRepo}" repositório`)
        }
    }

    return(
     <>
     <img src={Logo} alt='logo'/>
    <Title>
        Explore repositórios no GitHub
    </Title>

    <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input placeholder="Digite o nome do repositório" value={newRepo} onChange={ e => setNewRepo(e.target.value)}/>
        <button type="submit">Pesquisar</button>
    </Form>
        {inputError && <Error>{inputError}</Error>}

    {repositories.length > 0 &&    
    <Repositories>
        {repositories.map(repo =>(
           <Link key={repo.full_name} to={`/repositories/${repo.full_name}`}> 
                <img src={repo.owner.avatar_url} alt={repo.owner.login}/>
                <div>
                    <strong>{repo.full_name}</strong>
                    <p>{repo.description}</p>
                </div>
                    <FiChevronRight/>
            </Link>
        ))}
        </Repositories>
    }
     </>
    )

}

export default Dashboard