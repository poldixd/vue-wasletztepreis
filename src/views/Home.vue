<template lang="pug">
    div(
        class="border rounded bg-blue-800 w-1/2 mx-auto p-4 mt-4"
    )
        label.block
            span Produktpreis
            input.form-input.form-input-dark.mt-1.block.w-full(
                v-currency="{currency: 'EUR', locale: 'de'}"
                v-model="preis"
                @keyup="berechne"
            )

        label.block.mt-4
            span Porto
            select.form-select.form-select-dark.mt-1.block.w-full(
                v-model="porto"
                @change="berechne"
            )
                option(
                    v-for="(porto, key) in portoData"
                    :key="key"
                    :value="key"
                ) 
                    | {{ porto.name }}
                    template(v-if="porto.preis > 0")
                        | - {{ porto.preis | preis }}

        label.block.mt-4
            span PayPal
            select.form-select.form-select-dark.mt-1.block.w-full(
                v-model="paypal"
                @change="berechne"
            )
                option(
                    v-for="(paypal, key) in paypalData"
                    :key="key"
                    :value="key"
                ) {{ paypal.name }}

        label.block.mt-4
            span Rabatt {{ rabatt }}%
            input.mt-1.block.w-full(
                type="range"
                min="0"
                max="50"
                step="5"
                v-model="rabatt"
                @change="berechne"
            )

        div.mt-4.text-3xl
            code {{ ergebnis | preis }}
</template>

<script>
import { CurrencyDirective, parseCurrency } from 'vue-currency-input'

export default {
    directives: {
        currency: CurrencyDirective
    },

    data() {
        return {
            preis: null,
            ergebnis: null,

            rabatt: 0,

            porto: 0,
            portoData: [
                {
                    preis: 0,
                    name: '-- Kein Versand --'
                },{
                    preis: 3.79,
                    name: 'DHL Päckchen S 2 kg'
                }, {
                    preis: 4.39,
                    name: 'DHL Päckchen M 2 kg'
                }, {
                    preis: 4.99,
                    name: 'DHL Paket 2 kg',
                }, {
                    preis: 5.99,
                    name: 'DHL Paket 5 kg',
                }, {
                    preis: 8.49,
                    name: 'DHL Paket 10 kg',
                }
            ],


            paypal: 0,
            paypalData: [
                {
                    name: 'Freunde (ohne Gebühren)',
                    berechnung: (number) => parseFloat(number)
                },
                {
                    name: 'Dienstleistungen (mit Gebühren)',
                    berechnung: (number) => ((parseFloat(number) * (1 + (2.49/100))) + .35)
                }
            ]
        }
    },

    methods: {
        berechne() {

            let rabatt = 0
            let preis = this.paypalData[this.paypal].berechnung(this.preis) + this.portoKosten

            if (this.rabatt > 0) {
                rabatt = preis / 100 * this.rabatt
            }
            

            this.ergebnis = preis - rabatt
        }
    },

    computed: {
        portoKosten() {
            return this.portoData[this.porto].preis
        },
        preisValue() {
            return parseCurrency(this.preis, {currency: 'EUR', locale: 'de'})
        }
    },

    filters: {
        preis(number) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number)
        }
    }
}
</script>
