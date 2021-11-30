const txtModel = "filterModel"

export default {
  methods: {
    parseKeyFromQuery(filterName = "", _filterObj) {
      if (!_filterObj) {
        return {
          listKey: [],
          listValue: [],
        }
      }
      if (_filterObj.operator) {
        // double condition
        let listKey = []
        let listValue = []
        for (const key in _filterObj) {
          if (Object.hasOwnProperty.call(_filterObj, key)) {
            const typeF = typeof _filterObj[key]
            if (typeF === "string") {
              listKey.push(`${txtModel}[${filterName}][${key}]`)
              listValue.push(_filterObj[key])
            } else if (typeF === "object") {
              if (Array.isArray(_filterObj[key])) {
                listKey.push(`${txtModel}[${filterName}][${key}]`)
                listValue.push(_filterObj[key])
              } else {
                for (const innerKey in _filterObj[key]) {
                  if (Object.hasOwnProperty.call(_filterObj[key], innerKey)) {
                    listKey.push(
                      `${txtModel}[${filterName}][${key}][${innerKey}]`,
                    )
                    listValue.push(_filterObj[key][innerKey])
                  }
                }
              }
            }
          }
        }
        return {
          listKey,
          listValue,
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
      const myForm = new FormData()
      for (const key in _filterObj) {
        if (Object.hasOwnProperty.call(_filterObj, key)) {
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
      return queryString
    },
    parseQueryToFilter(query) {
      if (!query) {
        return {}
      }
      let res = {}
      for (const key in query) {
        if (Object.hasOwnProperty.call(query, key)) {
          const str = key.replaceAll("filterModel", "")
          let p = str
            .split("][")
            .map((o) => String(o).replaceAll("[", "").replaceAll("]", ""))
          if (p.length === 2) {
            // single
            const nestedObj = {}
            nestedObj[p[1]] = query[key]
            res[p[0]] = {
              ...(res[p[0]] || {}),
              ...nestedObj,
            }
          } else if (p.length === 3) {
            // double
            const nestedObj = {}
            const nestedObjV2 = {}
            nestedObjV2[p[2]] = query[key]

            nestedObj[p[1]] = {
              ...(res[p[0]][p[1]] || {}),
              ...(nestedObjV2 || {}),
            }

            res[p[0]] = {
              ...(res[p[0]] || {}),
              ...nestedObj,
            }
          }
        }
      }
      return res
    },
  },
}
