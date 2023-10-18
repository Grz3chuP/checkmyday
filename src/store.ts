import {computed, ref} from "vue";
import {checkUserIsLogin, getJobListFromFireStoreOrEmptyArray} from "@/firestore";
import {eventName, setupList, stepValue} from "@/setup";

export let loginOpen = ref(false);
export let signInOpen = ref(false);
export let userIsLogged = ref(false);

export let resetPasswordOpen = ref(false);
export const userUid = ref('');
export let nameValue = ref('');
//imie do wyszukiwania w Statistic
export let nameToSearch = ref('');
export let todayPay = computed(() => {
let sum = 0;
const currentDay = new Date().getTime();
const startDay = new Date().setHours(0, 0, 0, 0);
const endDay = new Date().setHours(23, 59, 59, 999);
const todayFilter = jobList.value.filter(job => job.date >= startDay && job.date <= endDay);

    // for (let i = 0; i < todayFilter.length; i++) {
    //     console.log('Dzisiejcze podsumowanie' + todayFilter[i].pay);
    //     sum += jobList.value[i].pay;
    //     console.log(jobList.value[i].pay);
    // }
    todayFilter.forEach(job => {
        sum += job.pay;
    });
    return sum;
});
export let jobNumber = ref(0);
export let jobList = ref<any[]>([]);

export async function getJobList() {
    console.log(userUid.value);
        if(userIsLogged.value) {
            jobList.value = await getJobListFromFireStoreOrEmptyArray('users/' + userUid.value + '/joblist', jobList.value);
            getSetupList()
        }

}
export async function getSetupList() {
console.log(userUid.value);
if(userIsLogged.value) {
    setupList.value = await getJobListFromFireStoreOrEmptyArray('users/' + userUid.value + '/setup', setupList.value);
    stepValue.value = setupList.value[0].stepValue;
    eventName.value = setupList.value[0].eventName;
}
}

export async function saveSetupListToDataBase() {

}
export function changeNameValue(name: string) {
    nameValue.value = name;

    return nameValue.value;

}


//testowanie querisow
export let testList = ref<any[]>([]);