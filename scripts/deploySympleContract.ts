import { toNano } from '@ton/core';
import { SympleContract } from '../wrappers/SympleContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const sympleContract = provider.open(await SympleContract.fromInit());

    await sympleContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(sympleContract.address);

    // run methods on `sympleContract`
}
