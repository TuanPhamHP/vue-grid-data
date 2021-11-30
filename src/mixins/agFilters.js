const operatorSymbolsFromText = {
  equals: "=",
  greaterThan: ">",
}
const txtModel = "filterModel"
function parseOperators(_operatorText) {
  return operatorSymbolsFromText[_operatorText]
}
export default {
  methods: {
    parseTextFilter(_textFilterObj) {
      if (!_textFilterObj) {
        return {}
      }

      if (_textFilterObj.operator) {
        // Multi condition
        console.log(_textFilterObj, "Multi condition")
      } else {
        // Single condition
        console.log(_textFilterObj, "Single condition")
      }
      return _textFilterObj.filter
    },
    parseNumbFilter(_numbFilterObj) {
      if (!_numbFilterObj && +_numbFilterObj !== 0) {
        return {}
      }
      if (_numbFilterObj.operator) {
        return {
          value: _numbFilterObj.filter,
          operatorFromSymbol: parseOperators(_numbFilterObj.type),
          operator: _numbFilterObj.operator,
          type: _numbFilterObj.type,
        }
      } else {
        return {
          value: _numbFilterObj.filter,
          operatorFromSymbol: parseOperators(_numbFilterObj.type),
          type: _numbFilterObj.type,
        }
      }
    },
    parseAction(_filterObj) {
      if (!_filterObj) {
        return null
      }
      switch (_filterObj.filterType) {
        case "text":
          return this.parseTextFilter(_filterObj)

        default:
          return this.parseNumbFilter(_filterObj)
      }
    },
    parseKeyFromQuery(filterName = "", _filterObj) {
      if (!_filterObj) {
        return {
          listKey: [],
          listValue: [],
        }
      }
      if (_filterObj.operator) {
        // multi condition
        return {
          listKey: [txtModel],
          listValue: [txtModel],
        }
      } else {
        // single condition
        let listKey = []
        let listValue = []
        for (const key in _filterObj) {
          if (Object.hasOwnProperty.call(_filterObj, key)) {
            listKey.push(`${txtModel}[${filterName}][${key}]`)
            listValue.push(_filterObj[key])
          }
        }
        return {
          listKey,
          listValue,
        }
      }
    },
    parseFilterToParams(_filterObj) {
      if (!_filterObj) {
        return {}
      }
      const result = {}
      console.log(_filterObj, "_filterObj")
      const myForm = new FormData()
      for (const key in _filterObj) {
        if (Object.hasOwnProperty.call(_filterObj, key)) {
          result[key] = this.parseAction(_filterObj[key])
          const { listKey, listValue } = this.parseKeyFromQuery(
            key,
            _filterObj[key],
          )
          listKey.forEach((o, idx) => {
            myForm.append(o, listValue[idx])
          })
        }
      }

      const queryString = new URLSearchParams(myForm).toString()
      console.log(queryString)
      // return result
      return queryString
    },
  },
}
