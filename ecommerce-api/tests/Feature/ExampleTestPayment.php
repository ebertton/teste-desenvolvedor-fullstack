<?php

namespace Tests\Feature;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Psr7\Response;
use Imdhemy\AppStore\ClientFactory;
use Imdhemy\AppStore\Exceptions\InvalidReceiptException;
use Imdhemy\Purchases\Facades\Product;
use JsonException;
use Tests\TestCase;

class ExampleTestPayment extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     * @throws GuzzleException
     * @throws InvalidReceiptException|JsonException
     */
    public function test_example(): void
    {
        // Create the expected body
        $responseBody = [
            'environment' => 'Sandbox',
            'status' => 0,
            'latest_receipt_info' => [
                [
                    'product_id' => 'fake_product_id',
                    'quantity' => '1',
                    'transaction_id' => 'fake_transaction_id',
                    // other fields omitted
                ],
            ],
            // other fields omitted
        ];

        // Create the response instance. It requires to JSON encode the body.
        $responseMock = new Response(200, [], json_encode($responseBody, JSON_THROW_ON_ERROR));

        // Use the client factory to mock the response.
        $client = ClientFactory::mock($responseMock);

        // --------------------------------------------------------------
        // The created client could be injected into a service
        // --------------------------------------------------------------
        // The part is up to you as a developer.
        //
        // Inside that service you can use the client as follows
        $verifyResponse = Product::appStore($client)->receiptData('fake_receipt_data')->verifyReceipt();
        // The returned response will contain the data from the response body you provided in the first line.
    }
}

