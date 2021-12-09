<template>
  <div class="dialog-edit" v-if="toggleDialog">
    <div @click="closeEdit" class="close-button">x</div>
    <div class="content">
      <div class="header">{{ editData.id }}</div>
      Dazzle, the Shadow Priest Each young acolyte to the Dezun order must
      complete a series of rites before becoming a shadow priest. The final
      rite, the rite of shades, is a harrowing spiritual journey through the
      Nothl Realm, an unpredictable domain from which not all visitants return.
      Of those who do, some return mad. Others return with strange aptitudes.
      But all who go there are changed by their experiences. Driven by the need
      for enlightenment, Dazzle was the youngest of his tribe ever to request
      the sacred ritual. At first the order refused him, saying he was too
      young. But Dazzle was not to be dissuaded. Sensing something special in
      the headstrong young acolyte, the elders relented. Dazzle drank down the
      sacred potion and sat by the fire while the rest of his tribe danced
      through the night. In this ethereal dimension of the Nothl Realm, the
      properties of light and dark are inverted. Thus his brilliant healing
      light, beautiful to our eye, is actually a sinister kind of evil; and the
      darkest deeds are done in a dazzling glow. The elders' intuition was
      prophetic: Dazzle returned to his people as a Shadow Priest like none seen
      before, with the power to heal as well as to destroy. Now he uses his gift
      to cut down his enemies and mend his friends.
    </div>
    <div class="footer">
      <div @click="closeEdit" class="edit-button">Sửa</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    closeEdit: {
      type: Function,
      default() {},
    },
    toggleDialog: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default() {},
    },
  },
  methods: {},
}
</script>

<style>
.dialog-edit {
  position: absolute;
  top: 25%;
  left: 25%;
  width: 600px;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #d3d3d3;
  z-index: 2;
}
.close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.content {
  margin: 40px 20px;
}
.header {
  font-size: 16px;
  margin-bottom: 10px;
}
.footer {
  background-color: #f2f4f6;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}
.edit-button {
  height: 40px;
  color: #fff;
  font-weight: 700;
  min-width: 98px;
  background-color: #006a9b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  cursor: pointer;
}
</style>
