import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:savemate_app/screens/add_data_screen.dart';
import 'package:savemate_app/screens/login_screen.dart';
import 'package:savemate_app/utils/secure_storage.dart';
import 'package:savemate_app/utils/constants.dart';

class DashboardScreen extends StatefulWidget {
  final String userName;
  final String userId;

  const DashboardScreen({
    super.key,
    required this.userName,
    required this.userId,
  });

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  List<Map<String, dynamic>> stats = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchDashboardData();
  }

  Future<void> fetchDashboardData() async {
    setState(() => isLoading = true);
    try {
      final expensesRes = await http.get(
        Uri.parse('$apiBaseUrl/api/expenses/user/${widget.userId}'),
      );
      final budgetsRes = await http.get(
        Uri.parse('$apiBaseUrl/api/budgets/user/${widget.userId}'),
      );
      final goalsRes = await http.get(
        Uri.parse('$apiBaseUrl/api/goals/user/${widget.userId}'),
      );

      final expenses = jsonDecode(expensesRes.body);
      final budgets = jsonDecode(budgetsRes.body);
      final goals = jsonDecode(goalsRes.body);

      double totalExpenses = 0;
      for (var item in expenses) {
        totalExpenses += double.tryParse(item['amount'].toString()) ?? 0;
      }

      double totalBudget = 0;
      if (budgets.isNotEmpty) {
        totalBudget = double.tryParse(budgets[0]['amount'].toString()) ?? 0;
      }

      double totalSaved = 0;
      double totalTarget = 0;
      for (var goal in goals) {
        totalSaved += double.tryParse(goal['saved_amount'].toString()) ?? 0;
        totalTarget += double.tryParse(goal['target_amount'].toString()) ?? 0;
      }

      setState(() {
        stats = [
          {'label': 'Total Expenses', 'value': totalExpenses},
          {'label': 'Current Budget', 'value': totalBudget},
          {'label': 'Total Saved Goals', 'value': totalSaved},
          {'label': 'Total Target Goals', 'value': totalTarget},
        ];
        isLoading = false;
      });
    } catch (e) {
      print('❌ Error fetching dashboard data: $e');
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard'),
        backgroundColor: Colors.green[700],
        actions: [
          IconButton(
            icon: const Icon(Icons.add),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const AddDataScreen(),
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await SecureStorage.clearToken();
              if (!mounted) return;
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(builder: (_) => LoginScreen()),
                (route) => false,
              );
            },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child:
            isLoading
                ? const Center(child: CircularProgressIndicator())
                : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Center(
                      child: Column(
                        children: [
                          Text(
                            'Welcome, ${widget.userName}!',
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 16),
                          const Text('This is your dashboard.'),
                          const SizedBox(height: 32),
                        ],
                      ),
                    ),
                    stats.isEmpty
                        ? Center(
                          child: Text(
                            'No data is to be shown yet.',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.grey[600],
                            ),
                          ),
                        )
                        : Expanded(
                          child: ListView.builder(
                            itemCount: stats.length,
                            itemBuilder: (context, index) {
                              final stat = stats[index];
                              return Card(
                                elevation: 2,
                                margin: const EdgeInsets.symmetric(vertical: 8),
                                child: ListTile(
                                  leading: const Icon(
                                    Icons.bar_chart,
                                    color: Colors.green,
                                  ),
                                  title: Text(stat['label']),
                                  trailing: Text(
                                    '\$${stat['value'].toStringAsFixed(2)}',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16,
                                    ),
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                  ],
                ),
      ),
      backgroundColor: Colors.white,
    );
  }
}
