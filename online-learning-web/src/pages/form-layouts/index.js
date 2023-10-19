// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const FormLayouts = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={12}>
        <Grid item xs={12} md={12}>
          <FormLayoutsIcons />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default FormLayouts
