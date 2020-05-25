<template lang="pug">
    #app
        .container.mx-auto
            router-view
        .container.mx-auto.text-center.mt-16.space-x-8
            a(
                href="https://www.paypal.com/de/webapps/mpp/paypal-fees"
                rel="noopener"

            ) PayPal Gebühreninformation
            span Stand: 18.12.2019
            a(
                href="https://github.com/poldixd/vue-wasletztepreis"
                rel="noopener"
            ) GitHub

        .container.mx-auto.text-center.mt-8.text-sm
            span alle Angaben ohne Gewähr
</template>