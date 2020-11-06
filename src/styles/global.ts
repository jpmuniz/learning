import { createGlobalStyle } from 'styled-components'

import githubBackground from '../assets/img/github-background.svg'


export default createGlobalStyle`

*{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box
}

body{
    background-color: #F0F0F5;
    -webkit-font-smoothing: antialiased;
    background-image: url(${githubBackground}) ;
    background-repeat: no-repeat ;
    background-position: 60% top;
}

body, input, button{
    font-size : 16px;
    font-family: Roboto sans-serif;
}

#root{
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
}

button{
    cursor: pointer;
}

`