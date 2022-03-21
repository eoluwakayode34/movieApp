import './App.css';
import {Text, Heading, Container, Spinner, Image, Input, Flex } from '@chakra-ui/react'
import {useState, useEffect} from 'react'
// import {Header} from './compnents/index.js'
import Logo from './assests/Logo.svg'
import Background from './assests/background.png'
import color from './util/color.js'
import axios from 'axios'
import * as Yup from 'yup'
import {Formik} from  'formik'

const validationSchema = Yup.object().shape({
    moviename: Yup.string().label("Movie Name")
})


function App() {
  const [movieData, setMovieData] = useState({})
  const [movieName, setMovieName] = useState('')
  const [loading, setLoading] = useState(false)
  const [movieError, setMovieError] = useState('')
  const handleSubmit = (values, { setSubmitting }) => {
    setMovieName(values.moviename)
    setSubmitting(false)    
    console.log(values)
    

    
}


  useEffect(() => {
   
    if(movieName){
      setMovieError({})
      setLoading(true)
      axios.get(`http://www.omdbapi.com/?t=${movieName}&apikey=15de9e86`)
      .then(res => res.data)
      .then(res => {
        setMovieData(res)
        setLoading(false)
        setMovieError(res)
  
      }).catch(e => {
        setLoading(false)
        setMovieError(e)
        console.log(e)})
   
  }
  }, [movieName])
  console.log(movieData)

  return (
    <Flex flexDir='column'>
      {/* header */}
    <Flex bg={color.black} py={['1rem','1rem','1.5rem']} >

      <Container  maxW='container.lg' > 
      <Flex flex='1' justifyContent={['center','center','flex-start']}>

      <Image src={Logo} h={['30px','30px','40px']} />
      </Flex>
    </Container>
    </Flex>


    {/* header */}

    <Flex bg={color.black} pos='relative'  h={['60vh','65vh','70vh']} overflow='hidden'   alignItems='center'  >
    <Container  maxW='container.lg' zIndex='1'> 

              <Heading color='white' fontSize={['3xl','4xl','5xl']} lineHeight='4rem' textAlign={['center','center','left']} alignSelf='center'  >
              Watch <br/>
               something <br/>
               incredible.
                          </Heading>
            </Container>
      <Image  pos='absolute' top='0' left='0' h='100%' src={Background} />

    </Flex>

    {/* search */}
    <Flex   alignItems='center' py='2rem' >
    <Container  maxW='container.lg' zIndex='1'> 

    

    <Formik initialValues={{moviename: ''}} 
        onSubmit={handleSubmit}
    
        validationSchema={validationSchema}
            >
        {({handleChange, setFieldTouched, values, errors, isSubmitting, handleSubmit, handleReset, touched }) => (
<form onSubmit={handleSubmit}>
<Flex flexDir='column'>

<Text color='black' mb='.3rem'>Search</Text>

<Input
type='search'
name='moviename'
id='moviename'
onChange={handleChange}
onBlur={() => setFieldTouched('moviename')}
values={values.moviename}
 w='100%'  /> 
    {touched.moviename && <Text  color='red.400' py='.2rem'>{ errors.moviename}</Text>}
    {movieError && <Text  color='red.400' py='.2rem'>{ movieError.Error}</Text>}
 
   

    </Flex>

</form>
        )

        }

        </Formik>
       
   
       </Container>

    </Flex>


    {/* movie Category */}
    <Flex   alignItems='center' py='2rem' >
    <Container  maxW='container.lg' zIndex='1'> 

    
    <Heading color='black' fontSize='md'  mb='1rem'>Category</Heading>

        {loading && <Spinner/>}
        {(movieData )  &&  <Flex overflowX='auto' width='100%' >

<Flex w='15rem' h='15rem' bg='black'  pos='relative' mx='.5rem' overflow='hidden' justifyContent='center' alignItems='center' borderRadius={15}>

    <Text color='white' zIndex={1}>{movieData.Title}</Text>
    <Image
    pos='absolute'
    
src={movieData.Poster}         />
</Flex>
</Flex>
}
    
    

   




           </Container>

    </Flex>



    </Flex>
   
  );
}

export default App;
