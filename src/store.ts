import {computed, ref} from "vue";
import {getJobListFromFireStoreOrEmptyArray} from "@/firestore";

export let nameValue = ref('');
export let todayPay = computed(() => {
let sum = 0;
const todayFilter = jobList.value.filter(job => new Date(job.date).getDate() === new Date().getDate());

    for (let i = 0; i < todayFilter.length; i++) {
        sum += jobList.value[i].pay;
        console.log(jobList.value[i].pay);
    }
    return sum;
});
export let jobNumber = ref(0);
export let jobList = ref<any[]>([]);

export async function getJobList() {
    jobList.value = await getJobListFromFireStoreOrEmptyArray('joblist');
}


export function changeNameValue(name: string) {
    nameValue.value = name;

    return nameValue.value;

}