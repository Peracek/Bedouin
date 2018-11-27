import * as yup from 'yup'

const schema = yup.object().shape({
  parameters: yup.array()
    .of(
      yup.object().shape({
        label: yup.string().max(20),
        description: yup.string().max(50),
        type: yup.string().oneOf(['', 'string', 'boolean']),
        defaultValue: yup.mixed()
          .when('type', {
            is: 'string',
            then: yup.string()
          })
          .when('type', {
            is: 'boolean',
            then: yup.string().oneOf(['', 'true', 'false'])
          })
      })
    )
})

export default schema