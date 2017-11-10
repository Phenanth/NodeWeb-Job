<template lang="html">
  <footer>
    <p>Copyrights © 2017 . All Rights Reserved.</p>
  </footer>
</template>

<script>
export default {
}
</script>

<style>
  footer{
    display: flex;
    display: -webkit-flex;
    height: 15vh;
    align-items: flex-end;
    justify-content: flex-end;
  }
  footer p{
    width: 100px;
    color: #fff;
    text-align: right;
    padding: 1rem 1.5rem;
    min-width: 100px;
    justify-content: center;
    background-color: rgb(119, 153, 145);
  }
  @media screen and (max-width:768px){
    footer{
      height: 6rem;
    }
  }
</style>
