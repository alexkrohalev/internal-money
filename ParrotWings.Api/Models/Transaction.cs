using System;
using Newtonsoft.Json;

namespace ParrotWings.Api.Models
{
  public class Transaction
  {

    [JsonProperty("id")]
    public int Id { get; set; }

    [JsonProperty("userId")]
    public int UserId { get; set; }
        
    [JsonProperty("sourceId")]
    public int SourceId { get; set; }

    [JsonProperty("amount")]
    public decimal Amount { get; set; }

    [JsonProperty("transactionDate")]
    public DateTimeOffset TransactionDate { get; set; }

  }
}