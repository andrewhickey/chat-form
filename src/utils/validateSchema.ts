import * as Yup from "yup"
import { InferType } from "yup"
import { set, get } from "lodash"

const validateSchema = (schema: Yup.ObjectSchema) => async (
  values: InferType<typeof schema>
) => {
  try {
    await schema.validate(values)
    return {}
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      let errors = {}
      if (error.inner) {
        if (error.inner.length === 0) {
          return set(errors, error.path, error.message)
        }
        for (let err of error.inner) {
          if (!get(errors, err.path)) {
            errors = set(errors, err.path, err.message)
          }
        }
      }
      return errors
    } else {
      // throw error
    }
  }
}

export default validateSchema
