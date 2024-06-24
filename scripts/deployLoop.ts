import { toNano } from '@ton/core';
import { Loop } from '../wrappers/Loop';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const loop = provider.open(await Loop.fromInit());

    await loop.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(loop.address);

    // run methods on `loop`
}
